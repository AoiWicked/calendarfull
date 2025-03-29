import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { format, parseISO, isValid } from "date-fns";
import styles from "./EventModal.module.scss";
import { IEvent } from "../../modules/calendar/Calendar";

interface IEventForm {
    title: string;
    date: string; 
    startTime: string;
    endTime: string;
    notes?: string;
}

interface EventModalProps {
    isOpen: boolean;
    defaultDate?: string;
    initialData?: IEvent;
    onCancel: () => void;
    onSave: (data: IEvent) => void;
    onDelete?: () => void;
}

const EventModal: FC<EventModalProps> = ({
    isOpen,
    defaultDate,
    initialData,
    onCancel,
    onSave,
    onDelete,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEventForm>({
        defaultValues: initialData
            ? {
                  title: initialData.title,
                  date: isValid(parseISO(initialData.start))
                      ? format(parseISO(initialData.start), "yyyy-MM-dd")
                      : "",
                  startTime: isValid(parseISO(initialData.start))
                      ? format(parseISO(initialData.start), "HH:mm")
                      : "",
                  endTime: isValid(parseISO(initialData.end))
                      ? format(parseISO(initialData.end), "HH:mm")
                      : "",
                  notes: initialData.notes || "",
              }
            : {
                  title: "",
                  date: defaultDate || "",
                  startTime: "",
                  endTime: "",
                  notes: "",
              },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                date: isValid(parseISO(initialData.start))
                    ? format(parseISO(initialData.start), "yyyy-MM-dd")
                    : "",
                startTime: isValid(parseISO(initialData.start))
                    ? format(parseISO(initialData.start), "HH:mm")
                    : "",
                endTime: isValid(parseISO(initialData.end))
                    ? format(parseISO(initialData.end), "HH:mm")
                    : "",
                notes: initialData.notes || "",
            });
        } else {
            reset({
                title: "",
                date: defaultDate || "",
                startTime: "",
                endTime: "",
                notes: "",
            });
        }
    }, [initialData, defaultDate, reset]);

    if (!isOpen) return null;

    const modalStyle = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    const onSubmit: SubmitHandler<IEventForm> = (data) => {
        const fullStart = `${data.date}T${data.startTime}`;
        const fullEnd = `${data.date}T${data.endTime}`;
        onSave({
            id: initialData ? initialData.id : Date.now().toString(),
            title: data.title,
            start: fullStart,
            end: fullEnd,
            notes: data.notes,
        });
    };

    return (
        <div className={styles.eventModalBackdrop} onClick={onCancel}>
            <div
                className={styles.eventModal}
                style={modalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    onClick={onCancel}
                    className={styles.eventModal__closeIcon}
                >
                    +{" "}
                </span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="title"
                            className={styles.eventModal__label}
                        >
                            Event Name:
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", {
                                required: true,
                                maxLength: 30,
                            })}
                            className={styles.eventModal__input}
                            placeholder="Max 30 chars"
                        />
                        {errors.title && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно и не должно превышать 30
                                символов
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="date"
                            className={styles.eventModal__label}
                        >
                            Event Date:
                        </label>
                        <input
                            id="date"
                            type="date"
                            {...register("date", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.date && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="startTime"
                            className={styles.eventModal__label}
                        >
                            Start Time:
                        </label>
                        <input
                            id="startTime"
                            type="time"
                            {...register("startTime", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.startTime && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="endTime"
                            className={styles.eventModal__label}
                        >
                            End Time:
                        </label>
                        <input
                            id="endTime"
                            type="time"
                            {...register("endTime", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.endTime && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="notes"
                            className={styles.eventModal__label}
                        >
                            Notes:
                        </label>
                        <input
                            id="notes"
                            type="text"
                            {...register("notes", { maxLength: 30 })}
                            className={styles.eventModal__input}
                            placeholder="Max 30 chars"
                        />
                    </div>
                    <div className={styles.eventModal__actions}>
                        {initialData ? (
                            <button
                                type="button"
                                onClick={onDelete}
                                className={`${styles.eventModal__button} ${styles.eventModal__cancel}`}
                            >
                                Discard
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onCancel}
                                className={`${styles.eventModal__button} ${styles.eventModal__cancel}`}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className={`${styles.eventModal__button} ${styles.eventModal__save}`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
