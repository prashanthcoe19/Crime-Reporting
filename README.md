# Crime-Reporting

A Crime Reporting Application using Node JS, Express, MySQL and Sequelize in server side, EJS for admin dashboard and React for Client Side.

npm install on both the folder, client and server. 
In the  server folder, add your PORT number in server.js, Database configurations in file db,js of config folder. 

npm run server to run the backend, npm start to run react frontend and npm run dev to run both client and server concurrently.















////

getDate() {
      let date = new Date(this.message.headers['date']).toString().split(" ");
      let datez = new Date(this.message.headers['date']).toString().split(" ");
      // console.log(date);
      let comma = [0, 2, 3, 4];
      let dat= [];
      for (let i = 0; i < 4; i++) {
          dat[i] = datez[i]
      }
      console.log(dat);
      dat.join(" ");
      let week = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
      let jpW = ['a','b','c','d','e','金','g']
      let day = dat[0];
      console.log(day);
      for(let i=0;i<week.length;i++){
        if(day === week[i]){
            day = jpW[i];
            break;
        }
      }
      console.log(day);
      let newD = moment(new Date(dat)).format('YYYY MM DD');
      let today = moment(new Date()).format('YYYY MM DD');
      let x = moment.duration(newD.diff(today)).asDays();
      console.log(x + 'is Diff');
      let newDateA = newD.toString().split(" ")
      console.log(newD.toString().split(" "));
      newDateA[0] = `${newDateA[0]}年`;
      newDateA[1] = `${newDateA[1]}月`;
      newDateA[2] = `${newDateA[2]}日`;
      newDateA[3] = `(${day})`
      console.log(newDateA.join(""));

      for (let i = 0; i < date.length; i++) {
        if (comma.includes(i)) {
          dat[i] += ","
        }
      }
      // console.log(dat);
      for (let i = 0; i < date.length; i++) {
        if (comma.includes(i)) {
          date[i] += ","
        }
      }
      // console.log(date.join(" "));
      // return date.join(" ");
    },



////
