export const isValidSearchQuery = (searchQuery: string) => {
  if (!searchQuery) return true;
  const queryValidatorRegex = /^\(*(NOT )*(\(*((([A-Za-z]\s*)|(('[^']*'|"[^"]*")\s*))+((?:^|\W)in\s*(\(('[^']*'|"[^"]*")\s*([,]\s*('[^']*'|"[^"]*")\s*)*\))|(?:^|\W)not\s*in\s*([A-Za-z]+\s*)|(?:^|\W)in\s*([A-Za-z]+\s*)|(?:^|\W)= ('[^']*'|"[^"]*")|(?:^|\W)!= ('[^']*'|"[^"]*")|(?:^|\W)> ('[^']*'|"[^"]*")|(?:^|\W)< ('[^']*'|"[^"]*")|(?:^|\W)<= ('[^']*'|"[^"]*")|(?:^|\W)>= ('[^']*'|"[^"]*")|(?:^|\W)is ('[^']*'|"[^"]*")|(?:^|\W)not is ('[^']*'|"[^"]*"))\)*((?:^|\W)AND\W|(?:^|\W)OR\W)+(NOT\W)*)*\(*((([A-Za-z])|(('[^']*'|"[^"]*")))+((?:^|\W)in (\(('[^']*'|"[^"]*") *([,] *('[^']*'|"[^"]*"))*\))|(?:^|\W)in ([A-Za-z]+)|(?:^|\W)not in (\(('[^']*'|"[^"]*")([,]('[^']*'|"[^"]*"))*\))|(?:^|\W)not in ([A-Za-z]+)|(?:^|\W)= ('[^']*'|"[^"]*")|(?:^|\W)!= ('[^']*'|"[^"]*")|(?:^|\W)> ('[^']*'|"[^"]*")|(?:^|\W)< ('[^']*'|"[^"]*")|(?:^|\W)<= ('[^']*'|"[^"]*")|(?:^|\W)>= ('[^']*'|"[^"]*")|(?:^|\W)is ('[^']*'|"[^"]*")|(?:^|\W)not is ('[^']*'|"[^"]*")))*\)*)* *\(*(((ORDER BY ('[^']*'|"[^"]*"))*)|((ORDER BY [A-Za-z]*)*) *(ASC|DESC)*)*\)*\)*$/gi;
  return queryValidatorRegex.test(searchQuery.trim()) && isMatchingBrackets(searchQuery);
};

const isMatchingBrackets = (query: any) => {
  const stack = [];
  const map: any = {
    '(': ')'
  };

  for (const value of query) {
    if (value === '(') {
      stack.push(value);
    }
    if (value === ')') {
      const last = stack.pop();
      if (value !== map[last]) {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
};
