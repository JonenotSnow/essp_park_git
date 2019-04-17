
import activityRouter from './activityRouter';
import benevolentRouter from './benevolentRouter';
import homePageRouter from './homePageRouter';
import informationRouter from './informationRouter';
import manageRouter from './manageRouter';
import memberMattersRouter from './memberMattersRouter';
import overViewRouter from './overViewRouter';
import publicRentalRouter from './publicRentalRouter';

let bzRouter = [];
bzRouter.push(
    activityRouter,
    benevolentRouter,
    homePageRouter,
    informationRouter,
    manageRouter,
    memberMattersRouter,
    overViewRouter,
    publicRentalRouter
);

export default bzRouter;