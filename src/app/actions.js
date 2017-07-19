import plux from './plux';

const actions = {
  'loadconfig': plux.createAction("loadconfig"),
  'configloaded': plux.createAction("configloaded"),
  'toggleoption': plux.createAction("toggleoption"),
};

export default actions;
