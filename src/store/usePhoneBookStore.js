import { create } from "zustand";

const usePhoneBookStore = create((set) => ({
  // 연락처 목록을 저장하는 배열
  phoneBook: [],
  // 연락처 추가 함수
  addContact: (contact) =>
    set((state) => ({
      phoneBook: [...state.phoneBook, { id: Date.now(), ...contact }],
    })),

  // 연락처 삭제 함수
  deleteContact: (id) =>
    set((state) => ({
      phoneBook: state.phoneBook.filter((contact) => contact.id !== id),
    })),
  // 연락처 수정 함수
  updateContact: (updatedContact) =>
    set((state) => ({
      phoneBook: state.phoneBook.map((item) =>
        item.id === updatedContact.id ? updatedContact : item
      ),
    })),
}));

export default usePhoneBookStore;
