export class DateUtilities {



  constructor(){

  }

  dateToString(date: Date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let values: string[] = date.toString().split(' ');
    let month = monthNames.indexOf(values[1]) < 10 ?  '0' + monthNames.indexOf(values[1]) : monthNames.indexOf(values[1]);
    let dateString = values[2]+ '/' + month + '/'+values[3];
    return dateString;
  }

  stringToDate(dateString: string) {
    let values: string[] = dateString.toString().split('/');
    let date: Date = new Date(Number(values[2]), Number(values[0]) - 1, Number(values[1]));
    return date;
  }

  stringFormToDate(dateString: string) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let values: string[] = dateString.toString().split(' ');

    let date: Date = new Date(Number(values[3]), monthNames.indexOf(values[1]) + 1, Number(values[2]));
    return date;
  }

}
