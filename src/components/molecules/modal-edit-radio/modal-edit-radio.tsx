'use client'
import { Button, Modal } from 'flowbite-react'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RadioData } from '@/types/AllTypes'
import { EditRadioSchema, type EditRadioSchemaData } from '@/validations/EditRadioSchema'
import InputControlled from '@/components/atoms/input-controlled'
import { useRadioPlayer } from '@/context/radio-player-provider'

export default function ModalEditRadio({
  children,
  radioData,
}: {
  children: React.ReactNode
  radioData: RadioData
}): JSX.Element {
  const { setRefreshFavorites } = useRadioPlayer()
  const [openModal, setOpenModal] = React.useState(false)

  const { register, formState, handleSubmit, control } = useForm<EditRadioSchemaData>({
    mode: 'all',
    resolver: zodResolver(EditRadioSchema),
    defaultValues: {
      radioName: radioData.name,
      userNotes: radioData.user_notes,
    },
  })

  const { errors, dirtyFields } = formState

  const onSubmit = async (data: EditRadioSchemaData): Promise<void> => {
    const { radioName, userNotes } = data
    const store = localStorage.getItem('radio-browser')
    if (store != null) {
      const parsedStore = JSON.parse(store) as RadioData[]
      const currentRadio = parsedStore.find(radio => radio.stationuuid === radioData.stationuuid)
      if (currentRadio != null) {
        currentRadio.name = radioName
        currentRadio.user_notes = userNotes
      }
      const resultSore = [
        ...parsedStore.slice(
          0,
          parsedStore.findIndex(radio => radio.stationuuid === radioData.stationuuid),
        ),
        currentRadio,
        ...parsedStore.slice(parsedStore.findIndex(radio => radio.stationuuid === radioData.stationuuid) + 1),
      ]
      localStorage.setItem('radio-browser', JSON.stringify(resultSore))
      setRefreshFavorites(true)
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
        <Modal.Header>Terms of Service</Modal.Header>
        <form
          className="space-y-6"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Edit name</p>
            <Controller
              control={control}
              name="radioName"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              render={({ field: { onChange, value, ref, onBlur } }) => (
                <InputControlled
                  type="text"
                  label="Enter a name"
                  placeholder="Type a name or describe the radio"
                  onChange={onChange}
                  error={errors.radioName}
                  dirtyField={dirtyFields.radioName}
                  name="radioName"
                  register={register}
                />
              )}
            />
            {/* <button type="submit">Confirm</button> */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">User note</p>
            <Controller
              control={control}
              name="userNotes"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              render={({ field: { onChange, value, ref, onBlur } }) => (
                <InputControlled
                  type="text"
                  label="Enter a note"
                  placeholder="Type a note that you want to add"
                  onChange={onChange}
                  error={errors.userNotes}
                  dirtyField={dirtyFields.userNotes}
                  name="userNotes"
                  register={register}
                />
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">I accept</Button>
            <Button color="gray" onClick={handleToggleModal}>
              Decline
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
