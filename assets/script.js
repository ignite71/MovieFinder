var output = '<label for="years">Choose a year:</label> <select id="years" name="years">'
output += ' <option value=""> year </option>'

    for (let i = 1950; i < 2021; i++) {
        output += 
        ' <option value=" '  + i + '  "> ' + i + '</option>'
      
     }
     output += '</select>'
     document.getElementById("year").innerHTML= output



