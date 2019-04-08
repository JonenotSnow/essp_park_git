
import activityRouter from './activityRouter';
import informationRouter from './informationRouter';
import manageRouter from './manageRouter';
import needHallRouter from './needHallRouter';
import sciAndTechRouter from './sciAndTechRouter';
import serviceHall from './serviceHall';
import firstPageRouter from './firstPageRouter';

let bdRouter = [];
bdRouter.push(
    activityRouter,
    informationRouter,
    manageRouter,
    needHallRouter,
    sciAndTechRouter,
    serviceHall,
    firstPageRouter
);

export default bdRouter;