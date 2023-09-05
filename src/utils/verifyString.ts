export default (
  value: string,
  verifys: ((v: string) => { reasult: boolean; value: string })[],
): { reasult: boolean; value: string } => {
  let verifyResult: { reasult: boolean; value: string } = {
    reasult: true,
    value,
  };
  for (const verify of verifys) {
    verifyResult = verify(verifyResult.value);
    if (!verifyResult.reasult) break;
  }
  return verifyResult;
};
