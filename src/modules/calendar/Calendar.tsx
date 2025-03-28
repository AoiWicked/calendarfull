// CalendarWithModal.tsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
    DateClickArg,
    EventDragStopArg,
} from "@fullcalendar/interaction";
import EventModal from "../../components/EventModal/EventModal";

// Интерфейс события с id
export interface IEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    notes?: string;
}

export type EventFormInputs = Omit<IEvent, "id">;

const CalendarWithModal: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [defaultDate, setDefaultDate] = useState<string | undefined>(
        undefined
    );

    const handleDateClick = (arg: DateClickArg) => {
        const rect = arg.dayEl.getBoundingClientRect();
        const top = rect.top + rect.height / 2;
        const left = rect.left + rect.width / 2;
        setModalPosition({ top, left });
        setDefaultDate(arg.dateStr);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSave = (data: EventFormInputs) => {
        const newEvent: IEvent = {
            id: Date.now().toString(),
            title: data.title,
            start: data.start,
            end: data.end,
            notes: data.notes,
        };
        setEvents((prev) => [...prev, newEvent]);
        setIsModalOpen(false);
    };

    const handleEventDrop = (info: EventDragStopArg) => {
        const droppedEvent = info.event;
        setEvents((prev) =>
            prev.map((e) =>
                e.id === droppedEvent.id
                    ? {
                          ...e,
                          start: droppedEvent.startStr,
                          end: droppedEvent.endStr,
                      }
                    : e
            )
        );
    };

    console.log(events);

    return (
        <div style={{ position: "relative" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "today prev next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                    prev: "prev",
                    next: "next",
                    today: "today",
                }}
                dateClick={handleDateClick}
                events={events}
                eventDrop={handleEventDrop}
                editable={true}
                eventContent={(arg) => (
                    <div>
                        <strong>{arg.event.title}</strong>
                        {arg.event.extendedProps.notes && (
                            <div
                                style={{ fontSize: "0.8em", marginTop: "2px" }}
                            >
                                {arg.event.extendedProps.notes}
                            </div>
                        )}
                    </div>
                )}
            />
            <EventModal
                isOpen={isModalOpen}
                top={modalPosition.top}
                left={modalPosition.left}
                defaultDate={defaultDate}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        </div>
    );
};

export default CalendarWithModal;
