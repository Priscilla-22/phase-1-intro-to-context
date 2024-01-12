function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const [hour, min] = time.split(':');
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const [hour, min] = time.split(':');
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;

    return (timeOut - timeIn) / 100;
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const amountOwed = hoursWorked * employeeRecord.payPerHour;
  return amountOwed;
}

function allWagesFor(employeeRecord) {
  const dates = [
    ...new Set([
      ...employeeRecord.timeInEvents.map((event) => event.date),
      ...employeeRecord.timeOutEvents.map((event) => event.date),
    ]),
  ];

  const allPayOwed = dates.reduce((acc, date) => {
    return acc + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return allPayOwed;
}

function calculatePayroll(employeeRecords) {
  const payroll = employeeRecords.reduce((acc, employeeRecord) => {
    return acc + allWagesFor(employeeRecord);
  }, 0);

  return payroll;
}
