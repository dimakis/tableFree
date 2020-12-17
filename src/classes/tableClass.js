
export default class Table {
    constructor(tableName, id, timeSlots) {
        this.tableName = tableName;
        this.id = id;
        this.timeSlots = timeSlots;
    }

     addTimeSlot = (timeSlot) => {
        this.timeSlots.push(timeSlot)
    }

    // public setTime(time)
}