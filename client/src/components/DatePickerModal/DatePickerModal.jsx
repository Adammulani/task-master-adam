import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React from "react";

export const DatePickerModal = ({
  opened,
  setOpened,
  value,
  setValue,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Choose Deadline For Task"
      centered
    >
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value} onClick={() => setOpened(false)}>
         Done
        </Button>
      </div>
    </Modal>
  );
};
