module.exports =
  (...args) =>
  (_, m, d) => {
    m.metadata({ ran: true });
    args.forEach((arg) => {
      m.metadata(arg);
    });
    d();
  };
