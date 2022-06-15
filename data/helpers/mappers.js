module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };
console.log(project.actions)
  if (project.actions) {
    // result.actions = project.actions.map(action => ({
    //   ...action,
    //   completed: intToBoolean(action.completed),
    // }));
    result.actions = project.actions
  }

  return result;
}

function actionToBody(action) {
  return {
    ...action,
    completed: intToBoolean(action.completed),
  };
}
