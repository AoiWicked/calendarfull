import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, {
    DateClickArg,
    EventDragStopArg,
} from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { format } from "date-fns";

import EventModal from "../../components/EventModal/EventModal";
import cl from "./Calendar.module.scss";

// Интерфейс события
export interface IEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    notes?: string;
}
export type EventFormInputs = Omit<IEvent, "id">;

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>(() => {
        const storedEvents = localStorage.getItem("calendarEvents");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultDate, setDefaultDate] = useState<string | undefined>(
        undefined
    );
    const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
    const [activeView, setActiveView] = useState("dayGridMonth");
    const [activeToday, setActiveToday] = useState(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const calendarRef = useRef<FullCalendar>(null);

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }, [events]);

    const handleDatesSet = (arg: { start: Date }) => {
        setCurrentDate(arg.start);
    };

    const getFormattedDate = () => format(currentDate, "MMMM yyyy");

    const handleToday = () => {
        calendarRef.current?.getApi().today();
        setActiveToday(true);
        setEditingEvent(null);
    };

    const handlePrev = () => {
        calendarRef.current?.getApi().prev();
        setActiveToday(false);
        setEditingEvent(null);
    };

    const handleNext = () => {
        calendarRef.current?.getApi().next();
        setActiveToday(false);
        setEditingEvent(null);
    };

    const handleChangeView = (viewName: string) => {
        calendarRef.current?.getApi().changeView(viewName);
        setActiveView(viewName);
        setActiveToday(false);
        setEditingEvent(null);
    };

    const handleDateClick = (arg: DateClickArg) => {
        setDefaultDate(arg.dateStr);
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (arg: EventClickArg) => {
        const clickedEvent = arg.event;
        setEditingEvent({
            id: clickedEvent.id,
            title: clickedEvent.title,
            start: clickedEvent.startStr,
            end: clickedEvent.endStr,
            notes: clickedEvent.extendedProps.notes,
        });
        setIsModalOpen(true);
    };

    const handleSave = (data: IEvent) => {
        if (editingEvent) {
            setEvents((prev) =>
                prev.map((e) =>
                    e.id === editingEvent.id ? { ...e, ...data } : e
                )
            );
            setEditingEvent(null);
        } else {
            const newEvent: IEvent = {
                id: Date.now().toString(),
                title: data.title,
                start: data.start,
                end: data.end,
                notes: data.notes,
            };
            setEvents((prev) => [...prev, newEvent]);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const handleDelete = () => {
        if (editingEvent) {
            setEvents((prev) => prev.filter((e) => e.id !== editingEvent.id));
            setEditingEvent(null);
        }
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

    return (
        <div className={cl.calendarWrapper}>
            <div className={cl.toolbar}>
                <div className={cl.toolbar__column}>
                    <div className={cl.toolbar__title}>Calendar View</div>
                    <div className={cl.toolbar__buttons}>
                        <button
                            onClick={handleToday}
                            className={activeToday ? cl.activeButton : ""}
                        >
                            Today
                        </button>
                        <button onClick={handlePrev}>Back</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </div>

                <div className={cl.toolbar__column}>
                    <div></div>
                    <div className={cl.toolbar__date}>{getFormattedDate()}</div>
                </div>

                <div className={cl.toolbar__column}>
                    <div className={cl.toolbar__buttons}>
                        <button
                            onClick={() => handleChangeView("dayGridMonth")}
                            className={
                                activeView === "dayGridMonth"
                                    ? cl.activeButton
                                    : ""
                            }
                        >
                            Month
                        </button>
                        <button
                            onClick={() => handleChangeView("timeGridWeek")}
                            className={
                                activeView === "timeGridWeek"
                                    ? cl.activeButton
                                    : ""
                            }
                        >
                            Week
                        </button>
                        <button
                            onClick={() => handleChangeView("timeGridDay")}
                            className={
                                activeView === "timeGridDay"
                                    ? cl.activeButton
                                    : ""
                            }
                        >
                            Day
                        </button>
                        <button
                            onClick={() => handleChangeView("listWeek")}
                            className={
                                activeView === "listWeek" ? cl.activeButton : ""
                            }
                        >
                            Agenda
                        </button>
                    </div>
                </div>
            </div>

            <div className="fullCalendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    headerToolbar={false}
                    datesSet={handleDatesSet}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    events={events}
                    eventDrop={handleEventDrop}
                    editable={true}
                    buttonText={{
                        month: "Month",
                        week: "Week",
                        day: "Day",
                        list: "Agenda",
                    }}
                    eventContent={(arg) => (
                        <div>
                            <strong>{arg.event.title}</strong>
                            {arg.event.extendedProps.notes && (
                                <div
                                    style={{
                                        fontSize: "0.8em",
                                        marginTop: "2px",
                                    }}
                                >
                                    {arg.event.extendedProps.notes}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>

            <EventModal
                isOpen={isModalOpen}
                defaultDate={editingEvent ? editingEvent.start : defaultDate}
                initialData={editingEvent || undefined}
                onCancel={handleCancel}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Calendar;
