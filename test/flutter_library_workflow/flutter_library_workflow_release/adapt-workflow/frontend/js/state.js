export let plugins = [];
export let currentEventSource = null;
export let currentAgentPluginId = null;

export const filters = {
  search: '',
  status: '',
  pluginType: '',
  architecture: '',
  recommendation: '',
  qualityScore: '',
  source: '',
};

export const selectedIds = new Set();

export function setPlugins(value) {
  plugins = value;
}

export function updatePlugin(index, data) {
  plugins[index] = { ...plugins[index], ...data };
}

export function setFilter(key, value) {
  filters[key] = value;
}

export function resetFilters() {
  for (const key of Object.keys(filters)) filters[key] = '';
}

export function toggleSelected(id) {
  if (selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
}

export function setSelectedAll(ids) {
  selectedIds.clear();
  for (const id of ids) selectedIds.add(id);
}

export function clearSelected() {
  selectedIds.clear();
}

