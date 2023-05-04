export function future(days: number): Date {
  var dayMs = 86400000;
  var ts = dayMs * days;
  var now = +new Date();
  var fts = now + ts;
  return new Date(fts);
}
