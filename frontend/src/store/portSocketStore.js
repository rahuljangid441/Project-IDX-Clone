import { create } from "zustand";
export const usePortSocketStore = create((set)=>{
    return{
        port:null,
        setPort: (port)=>{
            set({
                port:port
            });
        }
    }
})