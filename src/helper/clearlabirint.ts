import { Direction, Cell, DirectionsInfo } from '../types';
import { isUndefined } from 'util';
import { saveLabirint, saveKeys } from '@src/store/Labirint';

export const clearLabirint = [
  [
    {
      directions: {
          [Direction.down]: true,
          [Direction.right]: true,
          [Direction.left]: false,
          [Direction.up]: false,
      },
    },
    {
      directions: {
          [Direction.down]: true,
          [Direction.right]: true,
          [Direction.left]: true,
          [Direction.up]: false,
        }
    },
    {
      directions: {
          [Direction.down]: true,
          [Direction.right]: true,
          [Direction.left]: true,
          [Direction.up]: false,
        }
    },
    {
      directions: {
          [Direction.down]: true,
          [Direction.right]: true,
          [Direction.left]: true,
          [Direction.up]: false,
      }
    },
    {
    directions: {
        [Direction.down]: true,
        [Direction.right]: false,
        [Direction.left]: true,
        [Direction.up]: false,
    }
} 
],

[
    {
    directions: {
        [Direction.down]: true,
        [Direction.right]: true,
        [Direction.left]: false,
        [Direction.up]: true,
    },
},
{
  directions: {
      [Direction.down]: true,
      [Direction.right]: true,
      [Direction.left]: true,
      [Direction.up]: true,
  }
},
{
  directions: {
      [Direction.down]: true,
      [Direction.right]: true,
      [Direction.left]: true,
      [Direction.up]: true,
  }
},
{
  directions: {
      [Direction.down]: true,
      [Direction.right]: true,
      [Direction.left]: true,
      [Direction.up]: true,
  }
},
{
  directions: {
      [Direction.down]: true,
      [Direction.right]: false,
      [Direction.left]: true,
      [Direction.up]: true,
  }
},
],

[
  {
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: false,
            [Direction.up]: true,
        },
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
        }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: false,
            [Direction.left]: true,
            [Direction.up]: true,
        }
}, 
],

[
    {
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: false,
            [Direction.up]: true,
        },
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
        }
},
{
        directions: {
            [Direction.down]: true,
            [Direction.right]: false,
            [Direction.left]: true,
            [Direction.up]: true,
        }
},  
],

[
    {
        directions: {
            [Direction.down]: false,
            [Direction.right]: true,
            [Direction.left]: false,
            [Direction.up]: true,
        },
},
{
        directions: {
            [Direction.down]: false,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: false,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
    }
},
{
        directions: {
            [Direction.down]: false,
            [Direction.right]: true,
            [Direction.left]: true,
            [Direction.up]: true,
        }
},
{
        directions: {
            [Direction.down]: false,
            [Direction.right]: false,
            [Direction.left]: true,
            [Direction.up]: true,
        }
}, 
],
];

export const findUneditableDirections = (row: number, col: number, labirintLength: number): Direction[] => {
    if(row === 0 && col === 0) {
        return [Direction.up, Direction.left];
      }
      else if(row === 0 && col === labirintLength - 1) {
        return [Direction.up, Direction.right];
      }
      else if(row === labirintLength - 1 && col === 0) {
        return [Direction.down, Direction.left];
      }
      else if(row === labirintLength - 1 && col === labirintLength - 1) {
        return [Direction.down, Direction.right];
      }
      else if(row === 0) {
        return [Direction.up];
      }
      else if(col === 0) {
        return [Direction.left];
      }
      else if(row === labirintLength - 1) {
        return [Direction.down];
      }
      else if(col === labirintLength - 1) {
        return [Direction.right];
      }
      else {
        return [];
      }
}
export const clearDirections = (cell: Cell, exceptions?: Direction[]) => {
    if(exceptions) {
        Object.keys(cell.directions).map(index => {
            const direction = Number(index) as Direction;
            const result = exceptions.find(exception => exception === direction);
            if(!isUndefined(result)) {
                cell.directions[result] = false;
            }
            else {
                cell.directions[direction] = true;
            }
        });
    }
    else {
        Object.keys(cell.directions).map(index => {
            const direction = Number(index) as Direction;
            cell.directions[direction] = true;
        });
    }
}

export const createLabirint = (rows: number, cols: number) => {
    saveKeys([]);
    const result: Cell[][] = [];
    for (let row = 0; row < rows; row++) {
        result[row] = [];
        for(let col = 0; col < cols; col++) {
            const unEditableDirections = findUneditableDirections(row, col, rows);
            result[row][col] = {
                directions: {
                    [Direction.down]: unEditableDirections.some(direction => direction === Direction.down )? false: true,
                    [Direction.right]: unEditableDirections.some(direction => direction === Direction.right )? false: true,
                    [Direction.left]: unEditableDirections.some(direction => direction === Direction.left )? false: true,
                    [Direction.up]: unEditableDirections.some(direction => direction === Direction.up )? false: true,
                }
            }
        }
    }
    saveLabirint(result);
    return result;
}

// export const clearLabirint = [
//     [
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: false,
//             [Direction.up]: false,
//         },
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//           }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//           }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//         }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//           }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//           }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//         }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//           }
//       },
//       {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: false,
//         }
//       },
//       {
//       directions: {
//           [Direction.down]: true,
//           [Direction.right]: false,
//           [Direction.left]: true,
//           [Direction.up]: false,
//       }
//   } 
//   ],
  
//   [
//       {
//       directions: {
//           [Direction.down]: true,
//           [Direction.right]: true,
//           [Direction.left]: false,
//           [Direction.up]: true,
//       },
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: false,
//         [Direction.left]: true,
//         [Direction.up]: true,
//     }
//   },
//   ],
  
//   [
//     {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: false,
//               [Direction.up]: true,
//           },
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: false,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   }, 
//   ],
  
//   [
//       {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: false,
//               [Direction.up]: true,
//           },
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: true,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   },
//   {
//           directions: {
//               [Direction.down]: true,
//               [Direction.right]: false,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   },  
//   ],
//   [
//     {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: false,
//             [Direction.up]: true,
//         },
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: false,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },  
// ],
// [
//     {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: false,
//             [Direction.up]: true,
//         },
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: false,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },  
// ],
// [
//     {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: false,
//             [Direction.up]: true,
//         },
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: false,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },  
// ],
// [
//     {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: false,
//             [Direction.up]: true,
//         },
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//   directions: {
//       [Direction.down]: true,
//       [Direction.right]: true,
//       [Direction.left]: true,
//       [Direction.up]: true,
// }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//     }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: true,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },
// {
//         directions: {
//             [Direction.down]: true,
//             [Direction.right]: false,
//             [Direction.left]: true,
//             [Direction.up]: true,
//         }
// },  
// ],
  
//   [
//       {
//           directions: {
//               [Direction.down]: false,
//               [Direction.right]: true,
//               [Direction.left]: false,
//               [Direction.up]: true,
//           },
//   },
//   {
//           directions: {
//               [Direction.down]: false,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//     directions: {
//         [Direction.down]: false,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: false,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: false,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: false,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
// {
//     directions: {
//         [Direction.down]: false,
//         [Direction.right]: true,
//         [Direction.left]: true,
//         [Direction.up]: true,
// }
// },
//   {
//           directions: {
//               [Direction.down]: false,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//       }
//   },
//   {
//           directions: {
//               [Direction.down]: false,
//               [Direction.right]: true,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   },
//   {
//           directions: {
//               [Direction.down]: false,
//               [Direction.right]: false,
//               [Direction.left]: true,
//               [Direction.up]: true,
//           }
//   }, 
//   ],
//   ];
export default clearLabirint;