"use client"

import { SessionObjectType } from "@/schemas"

export const checkout = async (sessionObject: SessionObjectType) => {
    await fetch("/api/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionObject),
    })
        .then((res) => res.json())
        .then((data) => {
            try {
                if (data) {
                    window.location.assign(data)
                }
            } catch (error) {
                console.log("No data returned from server.")
            }
        })
}
