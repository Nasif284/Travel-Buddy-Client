"use client"
import React, { useState } from 'react'
import ModalLayout from '../../../../components/Modal';
import CreateTrip from './CreateTrip';
import CreateGroup from './CreateGroup';
const AddIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const CreateGroupButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
      <>
        <button onClick={() => setModalOpen(true)} className="bg-[#0f6e56] text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform">
          <span>Create new group</span>
          <AddIcon />
        </button>
        {modalOpen && (
          <ModalLayout isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Group">
            <CreateGroup onClose={() => setModalOpen(false)} />
          </ModalLayout>
        )}
      </>
    );
}

export default CreateGroupButton