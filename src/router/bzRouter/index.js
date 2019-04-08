
import activityRouter from './activityRouter';
import firstPageRouter from './firstPageRouter';
import goverRouter from './goverRouter';
import informationRouter from './informationRouter';
import manageRouter from './manageRouter';
import scanRouter from './scanRouter';

let bzRouter = [];
bzRouter.push(
    activityRouter,
    firstPageRouter,
    goverRouter,
    informationRouter,
    manageRouter,
    scanRouter
);

export default bzRouter;