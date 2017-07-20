import plux from './plux';

const actions = {
  'loadconfig': plux.createAction("loadconfig"),
  'configloaded': plux.createAction("configloaded"),
  'toggleoption': plux.createAction("toggleoption"),
  'clearoptions': plux.createAction("clearoptions"),
};

export default actions;
