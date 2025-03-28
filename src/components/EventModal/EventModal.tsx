import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./EventModal.module.scss";
import { IEvent } from "../../modules/calendar/Calendar";

interface EventModalProps {
    isOpen: boolean;
    top: number;
    left: number;
    defaultDate?: string;
    onCancel: () => void;
    onSave: (data: IEvent) => void;
}

const EventModal: FC<EventModalProps> = ({
    isOpen,
    top,
    left,
    defaultDate,
    onCancel,
    onSave,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEvent>({
        defaultValues: {
            title: "",
            start: defaultDate || "",
            end: "",
            notes: "",
        },
    });

    if (!isOpen) return null;

    const modalStyle = {
        top: `${top}px`,
        left: `${left}px`,
    };

    const onSubmit: SubmitHandler<IEvent> = (data) => {
        onSave(data);
    };

    return (
        <div className={styles.eventModalBackdrop} onClick={onCancel}>
            <div
                className={styles.eventModal}
                style={modalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={styles.eventModal__title}>Создание события</h2>
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
                            {...register("title", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.title && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="start"
                            className={styles.eventModal__label}
                        >
                            Event Date:
                        </label>
                        <input
                            id="start"
                            type="date"
                            {...register("start", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.start && (
                            <span className={styles.eventModal__error}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.eventModal__field}>
                        <label
                            htmlFor="end"
                            className={styles.eventModal__label}
                        >
                            Event Time:
                        </label>
                        <input
                            id="end"
                            type="time"
                            {...register("end", { required: true })}
                            className={styles.eventModal__input}
                        />
                        {errors.end && (
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
                        <textarea
                            id="notes"
                            {...register("notes")}
                            className={styles.eventModal__textarea}
                        />
                    </div>
                    <div className={styles.eventModal__actions}>
                        <button
                            type="button"
                            onClick={onCancel}
                            className={styles.eventModal__button}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.eventModal__button}
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
