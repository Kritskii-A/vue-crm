export default {
  // вывод
  bind(el, { value }) {
    window.M.Tooltip.init(el, { html: value });
  },
  // удаление, чтобы не засоряло страницу
  unbind(el) {
    const tooltip = window.M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
