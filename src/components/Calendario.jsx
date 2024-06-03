import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptLocale from '@fullcalendar/core/locales/pt';
import css from "./Dashboard_Card_Profs.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Calendario = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title2, setTitle] = useState('')
    const [selectItem, setSelectItem] = useState('')
    const handleDateClick = async (selected) => {
        setSelectItem(selected)
        setIsOpen(true);
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Deletar evento?'${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    function closeModal() {
        const selected = selectItem;
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        console.log(title2)

        if (title2) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title2}`,
                title: "Python para Web",
                start: new Date(2024, 5, 1),
                end: new Date(2024, 5, 15),
                allDay: selected.allDay,
            });
        }

        setIsOpen(false);
    }

    return (
        <div>
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
            ]}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            locale={ptLocale}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
                {
                    id: "12315",
                    title: "All-day event",
                    date: "2022-09-14",
                },
                {
                    id: "5123",
                    title: "Timed event",
                    date: "2022-09-28",
                },
            ]}
        />
            <div className={css.plus}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    overlayClassName="modal-overlay"
                >
                    <div className="modal-content">
                        <div>
                            <h2>Cadastrar Novo Evento</h2>
                        </div>
                        <div className={css.separa_inps}>
                            <input
                                className={css.inp}
                                placeholder={"Nome:"}
                                name="nome"
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <button className={css.cadastrar_btn} onClick={closeModal}>
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
)
    ;
};

export default Calendario;
