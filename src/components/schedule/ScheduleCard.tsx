// src/components/schedule/ScheduleCard.tsx
import React from "react";
import {
  more_horizontal,
  location as locationIcon,
  calendar,
  clock,
} from "../../assets";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import type { DetailedSchedule } from "../../types/schedule";

interface ScheduleCardProps {
  id: string;
  status:
    | "Scheduled"
    | "In progress"
    | "Completed"
    | "Cancelled"
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed";
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
  profilePicture?: string;
  clientInfo?: DetailedSchedule["ClientInfo"];
  variant?: "card" | "detail" | "centered";
  showActions?: boolean;
  showMoreButton?: boolean;
  showDateTimeSection?: boolean;
  showLocationSection?: boolean;
  email?: string;
  className?: string;
  asLink?: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  status,
  patientName,
  serviceName,
  location,
  date,
  timeRange,
  profilePicture,
  clientInfo,
  variant = "card",
  showActions = true,
  showMoreButton = true,
  showDateTimeSection = true,
  showLocationSection = true,
  email,
  className = "",
  asLink = true,
}) => {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "scheduled":
      case "upcoming":
        return "bg-caregray text-white";
      case "in progress":
      case "in_progress":
        return "bg-[#ED6C02] text-white";
      case "completed":
        return "bg-[#2E7D32] text-white";
      case "cancelled":
      case "missed":
        return "bg-[#D32F2F] text-white";
      default:
        return "bg-[#D32F2F] text-white";
    }
  };

  // Format the status for display
  const displayStatus = () => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "upcoming":
        return "Scheduled";
      case "in_progress":
        return "In progress";
      case "completed":
        return "Completed";
      case "missed":
        return "Cancelled";
      default:
        return status;
    }
  };

  // Format the full name from client info if available
  const fullName = clientInfo
    ? `${clientInfo.FirstName} ${clientInfo.LastName}`
    : patientName;

  // We'll use a ref to track if the component is mounted
  const isMounted = React.useRef(true);

  // Cleanup function to prevent state updates after unmount
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Determine the appropriate classes based on variant
  const cardClasses =
    variant === "card"
      ? "p-5 rounded-2xl shadow-sm bg-white"
      : variant === "centered"
      ? "rounded-2xl bg-tertiary"
      : "rounded-2xl bg-white";

  // Render the component based on whether it should be a link or not
  if (asLink) {
    return (
      <Link to={`/schedule/${id}`} className={`${cardClasses} ${className}`}>
        {renderCardContent()}
      </Link>
    );
  } else {
    return (
      <div className={`${cardClasses} ${className}`}>
        {renderCardContent()}
      </div>
    );
  }

  // Helper function to render the card content
  function renderCardContent() {
    // Centered variant content
    if (variant === "centered") {
      return (
        <div className={`flex flex-col items-center text-center py-2 px-2`}>
          {/* Service Name */}
          <h2 className="font-roboto font-semibold text-activity leading-activity text-activity-bg mb-4">
            {serviceName}
          </h2>

          {/* Profile Picture and Name */}
          <div className="flex items-center mb-2 gap-[8px]">
            <img
              src={
                profilePicture || clientInfo?.ProfilePicture || "invalid.jpg"
              }
              alt="Profile"
              className="w-16 h-16 rounded-full mb-2 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://picsum.photos/200/300";
              }}
            />
            <h3 className="text-base sm:text-xl font-semibold font-roboto">
              {fullName}
            </h3>
          </div>

          {/* Date and Time Section */}
          <div className="flex items-center justify-between w-full bg-tertiary rounded-xl text-gray-700 py-3 px-4">
            <div className="flex items-center justify-end w-full md:text-sm text-[12px]">
              <img src={calendar} alt="calendar" className="w-5 h-5 mr-2" />
              <span className="font-roboto text-sm">{date}</span>
            </div>
            <span className="text-[#00000099] mx-1 w-full">|</span>

            <div className="flex items-center w-full">
              <img src={clock} alt="clock" className="w-5 h-5 mr-2" />
              <span className="font-roboto md:text-sm text-[12px]">
                {timeRange}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Standard content for card and detail variants
    return (
      <>
        {/* Status and More Button */}
        <div className="flex justify-between items-start mb-2">
          <span
            className={`px-3 py-1 rounded-full text-[13px] font-semibold ${getStatusColor(
              status
            )}`}
          >
            {displayStatus()}
          </span>
          {showMoreButton && (
            <div
              role="button"
              className="text-gray-500 hover:text-gray-700 cursor-pointer sm:-mt-2"
            >
              <img
                src={more_horizontal}
                alt="more"
                className="h-5 sm:h-8 w-5 sm:w-8"
              />
            </div>
          )}
        </div>

        {/* Client Info Section */}
        <div className="flex items-center mb-2">
          <img
            src={profilePicture || clientInfo?.ProfilePicture || "invalid.jpg"}
            alt="Profile"
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full mr-3 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://picsum.photos/200/300";
            }}
          />
          <div>
            <h3 className="text-base sm:text-2xl font-semibold font-roboto">
              {fullName}
            </h3>
            <p className="text-gray-600 text-xs sm:text-base font-roboto">
              {serviceName}
            </p>
            {variant === "detail" && email && (
              <div className="flex items-center mt-2">
                <span className="mr-2">✉</span>
                <span className="font-roboto font-normal text-description leading-description text-task-text">
                  {email}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        {showLocationSection && (
          <div className="flex items-start text-xs sm:text-base text-gray-500 mb-4">
            <img
              src={locationIcon}
              alt="location"
              className="w-5 sm:w-6 h-5 sm:h-6 rounded-full mr-1 mt-1"
            />
            <span className="font-roboto">{location}</span>
          </div>
        )}

        {/* Date and Time Section */}
        {showDateTimeSection && (
          <div className="flex items-center text-xs sm:text-base justify-around bg-secondary rounded-xl text-gray-700 py-2 sm:py-3 mb-4">
            <div className="flex items-center">
              <img
                src={calendar}
                alt="calendar"
                className="w-6 h-6 rounded-full mr-1"
              />
              <span className="font-roboto">{date}</span>
            </div>
            <span className="text-gray-300 mx-1">|</span>

            <div className="flex items-center">
              <img
                src={clock}
                alt="clock"
                className="w-5 h-5 rounded-full mr-1"
              />
              <span className="font-roboto">{timeRange}</span>
            </div>
          </div>
        )}

        {/* Action Buttons - Only shown in card variant and if showActions is true */}
        {variant === "card" && showActions && (
          <>
            {status === "Scheduled" || status === "upcoming" ? (
              <Button>Clock-In Now</Button>
            ) : status === "In progress" || status === "in_progress" ? (
              <div className="flex space-x-2">
                <Button variant="ghost" className="flex-1">
                  View Progress
                </Button>
                <Button className="flex-1">Clock-Out Now</Button>
              </div>
            ) : status === "Completed" || status === "completed" ? (
              <Button variant="ghost">View Report</Button>
            ) : (
              <Button
                variant="ghost"
                disabled
                className="border-red-600 text-red-600 disabled:border-red-400 disabled:text-red-400"
              >
                Schedule Cancelled
              </Button>
            )}
          </>
        )}
      </>
    );
  }
};

export default ScheduleCard;