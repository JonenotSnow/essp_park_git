
import activityRouter from './activityRouter';
import benevolentRouter from './benevolentRouter';
import homePageRouter from './homePageRouter';
import informationRouter from './informationRouter';
import manageRouter from './manageRouter';
import memberMatters from './memberMatters';
import overViewRouter from './overViewRouter';
import publicRental from './publicRental';

let bzRouter = [];
bzRouter.push(
    activityRouter,
    benevolentRouter,
    homePageRouter,
    informationRouter,
    manageRouter,
    memberMatters,
    overViewRouter,
    publicRental
);

export default bzRouter;