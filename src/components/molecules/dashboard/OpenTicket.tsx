import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetOpenTicketQuery } from "@/store/api/userDashboardApi";
import { RootState } from "@/store/store";
import { setOpenTickets } from "@/store/slices/dashboard/openTicketSlice";
import Image from "next/image";

const OpenTicket = () => {
  const dispatch = useDispatch();
  const { data, isLoading: isFetchingOpenTicket } = useGetOpenTicketQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const tickets = useSelector((state: RootState) => state.openTicket.tickets);

  useEffect(() => {
    if (data && data.tickets) {
      dispatch(setOpenTickets(data.tickets));
    }
  }, [data, dispatch]);

  if (isFetchingOpenTicket) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 bg-white space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/3 bg-gray-300 rounded shimmer"></div>
              <div className="h-4 w-1/6 bg-gray-300 rounded shimmer"></div>
            </div>
            <div className="h-3 w-1/4 bg-gray-300 rounded shimmer"></div>
            <div className="h-4 w-full bg-gray-300 rounded shimmer"></div>
            <div className="h-20 w-1/2 bg-gray-300 rounded shimmer"></div>
            <div className="h-3 w-1/3 bg-gray-300 rounded shimmer"></div>
            <div className="h-3 w-2/3 bg-gray-300 rounded shimmer"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No open tickets.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-3 bg-white space-y-1"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{ticket.subject}</h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    ticket.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Ticket #: </strong> {ticket.ticketNumber}
              </p>

              <p className="text-gray-800">{ticket.description}</p>

              {ticket.image && (
                <div>
                  <strong className="text-sm">Attached Image:</strong>
                  <Image
                    src={ticket.image}
                    alt={ticket.description}
                    className="mt-2 w-[200px] h-auto  object-cover rounded"
                    width={200}
                    height={200}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/blur-placeholder.png"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600">
                <strong>Created At: </strong>
                {new Date(ticket.createdAt).toLocaleString()}
              </p>

              {ticket.adminReply ? (
                <p className="text-sm text-blue-600">
                  <strong>Admin Reply:</strong> {ticket.adminReply}
                </p>
              ) : (
                <p className="text-sm text-red-500">
                  <strong>Admin Reply:</strong> No reply yet
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenTicket;
