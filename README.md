# BestGifts
Web application created in Angular 11.2.14 <img src="https://avatars.githubusercontent.com/u/139426?s=200&v=4" width="32" height="32"> For [BestGiftsAPI](https://github.com/owik100/BestGiftsAPI)
<br/>
Preview available [here](https://owik100.github.io/best-gifts/)
<br/>
<br/>
<img src="https://github.com/owik100/Portfolio/blob/gh-pages/images/Projects/Best%20Gifts/Best%20gifts.gif" width="480" height="456">

With BestGifts you can:
 - Search and browse for gift ideas
<img src="https://github.com/owik100/Portfolio/blob/gh-pages/images/Projects/Best%20Gifts/gift%20list%20search.png" width="622" height="459">

 - Add new ideas
 <img src="https://github.com/owik100/Portfolio/blob/gh-pages/images/Projects/Best%20Gifts/gift%20add.png" width="622" height="459">

 - Vote for best and worst ideas
 - Comment on ideas
 <img src="https://github.com/owik100/Portfolio/blob/gh-pages/images/Projects/Best%20Gifts/gifts%20item.png" width="622" height="459">
 
 - Checking API Server status (Online/Offline)
 <img src="https://github.com/owik100/Portfolio/blob/gh-pages/images/Projects/Best%20Gifts/Best%20gifts%20server%20status.gif">
 
 ## Prerequisites
You will need [Angular 11.2.14](https://www.npmjs.com/package/@angular/cli/v/11.2.4)
 ## Configuration
1. Add baseURL in **environment.ts** to DefaultConnection
```
  export const environment = {
  urlAPI : 'https://localhost:44302/api',
};
```
2. Run the application
```
ng serve
```
