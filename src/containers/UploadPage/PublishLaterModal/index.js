import { Button, DialogContent, DialogTitle } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";
import moment from "moment";
import PropTypes from "prop-types";
import React, { memo, useRef, useState, useEffect } from "react";
import { PublishLaterModalWrapper } from "./styles";

import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useTheme from "@mui/system/useTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

function PublishLaterModal({ onClose, onOk }) {
  const [selectedDate, handleDateChange] = useState(moment());
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () => createTheme({ direction: "rtl" }, existingTheme),
    [existingTheme]
  );
  const [selectedTime, handleTimeChange] = useState(moment());
  const [newTime, handleNewChange] = useState(null);


  useEffect(() => {
    const inputElement = document.getElementById('time-input');
    if (inputElement) {
      inputElement.defaultValue = selectedTime.format('HH:mm:ss');
    }
  }, [selectedTime]);

  const handleConfirm = () => {
    //TODO:اگر جفتشو وارد نکرد اررور بده
    const dateTime =
      moment(selectedDate).format("YYYY-MM-DD") +
      " " +
      newTime.format("HH:mm:ss");
      onOk(dateTime);
    console.log(dateTime);
  };

  const handleTimePickerChange = (time) => {
    handleTimeChange(moment(time));
  };

  const handleViewChange = (view) => {
    console.log("New view:", view);
  };

  return (
    <PublishLaterModalWrapper open>
      <DialogTitle>
        <span>زمان انتشار را انتخاب کنید</span>
        <CloseIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <ThemeProvider theme={theme}>
          <div dir="ltr">
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <DatePicker
                label="روز"
                value={selectedDate.toDate()}
                onChange={(date) => handleDateChange(moment(date))}
                renderInput={(props) => <input {...props} />}
                inputFormat="yyyy/MM/dd"
                disablePast={true}
              />
            </LocalizationProvider>
          </div>
        </ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["MobileDateTimePicker", "MobileDateTimePicker"]}
          >
            <MobileTimePicker
              label="زمان"
              defaultValue={selectedTime}
              value={newTime}
              onChange={handleNewChange}
              onAccept={handleViewChange}
              renderInput={(props) => (
                <input
                  {...props}
                  id="time-input"
                  defaultValue={selectedTime.format("HH:mm:ss")}
                  onClick={(e) => e.target.select()}
                />
              )}
              inputFormat="HH:mm:ss"
              ampm={false}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="outlined" className="myButton" onClick={handleConfirm}>تایید</Button>
      </DialogContent>
    </PublishLaterModalWrapper>
  );
}

PublishLaterModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(PublishLaterModal);
