"use client"

import clsx from "clsx"
import { IoMdClose } from "react-icons/io"

export const Modal = ({ ...props }) => {
    const onClick = () => {
        props.showModal ? props.setShowModal(false) : props.setShowModal(true)
    }

    return (
        <div
            className={clsx("w-full h-full absolute top-0 left-0 text-black", {
                visible: props.showModal,
                invisible: !props.showModal,
            })}
        >
            <div className="flex h-full w-full justify-center items-center bg-black  absolute top-0 left-0 z-0" />
            <button
                className="absolute w-[40px] h-[40px] right-[60px] top-[40px] text-white z-10 bg-black rounded-full  outline flex items-center justify-center"
                onClick={() => onClick()}
            >
                <IoMdClose size={30} />
            </button>
            {props.children}
        </div>
    )
}
