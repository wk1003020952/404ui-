export default function (target) {
  for (let i=0; i<arguments.length; i++){
    let source = arguments[i] ||{};
    for (let prop in source) {
      if(source.hasOwnProperty(prop)){
        let value = source[prop];
        if(value !== undefined){
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
