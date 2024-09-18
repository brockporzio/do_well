class TaskLocation {

    Day;
    Hour;

    constructor() {
      this.Day = 0;
      this.Hour = 0;
    }
  
    updateLocation(day, hour) {
      this.Day = day;
      this.Hour = hour;
    }
  }
  
  export default TaskLocation;
  