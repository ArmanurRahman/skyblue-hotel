import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm-v1";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>

                {/* <Modal.Open opens='table'>
                <Button>Show table</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CreateCabinForm />
            </Modal.Window> */}
            </Modal>
        </div>

        // <div>
        //     <Button onClick={() => setIsOpenModal((form) => !form)}>
        //         Add new cabin
        //     </Button>
        //     {isOpenModal && (
        //         <Modal>
        //             <CreateCabinForm />
        //         </Modal>
        //     )}
        // </div>
    );
}

export default AddCabin;
