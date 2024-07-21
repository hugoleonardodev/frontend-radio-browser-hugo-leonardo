'use client'
import { Button, Modal } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import React from 'react'
import { type RadioData } from '@/types/AllTypes'
import { useRadioPlayer } from '@/context/radio-player-provider'

interface ModalDeleteRadioProps {
  children: React.ReactNode
  radioData: RadioData
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function ModalDeleteRadio({
  children,
  radioData,
  currentPage,
  setCurrentPage,
}: ModalDeleteRadioProps): JSX.Element {
  const { setRefreshFavorites } = useRadioPlayer()
  const [openModal, setOpenModal] = React.useState(false)

  const { handleSubmit } = useForm()

  const onSubmit = (): void => {
    const store = localStorage.getItem('radio-browser')
    if (store != null) {
      const parsedStore = JSON.parse(store) as RadioData[]
      localStorage.setItem(
        'radio-browser',
        JSON.stringify(parsedStore.filter(radio => radio.stationuuid !== radioData.stationuuid)),
      )
      setRefreshFavorites(true)
    }
    // returns to previous page when last radio is deleted, and there are more previous pages
    const currentFavoritePage = document.querySelectorAll('audio')
    if (currentFavoritePage.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }

    setOpenModal(false)
  }

  const handleToggleModal = React.useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <>
      <button onClick={handleToggleModal}>{children}</button>
      <Modal dismissible show={openModal} onClose={handleToggleModal}>
        <Modal.Header>Delete radio</Modal.Header>
        <form
          className="space-y-6"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body>
            <h3>Are you sure you want to delete this radio?</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Delete</Button>
            <Button color="gray" onClick={handleToggleModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
