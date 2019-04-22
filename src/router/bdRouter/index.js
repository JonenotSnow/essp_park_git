
import activityRouter from './activityRouter';
import informationRouter from './informationRouter';
import manageRouter from './manageRouter';
import needHallRouter from './needHallRouter';
import sciAndTechRouter from './sciAndTechRouter';
import serviceHall from './serviceHall';
import homePageRouter from './homePageRouter';

let bdRouter = [];
bdRouter.push(
    activityRouter,
    informationRouter,
    manageRouter,
    needHallRouter,
    sciAndTechRouter,
    serviceHall,
    homePageRouter
);

export default bdRouter;