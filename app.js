document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid')
   const width = 8
   const squares = []
   const scoreDisplay = document.getElementById('score')
   const candyColors = [
      // 'url(images/red-candy.png)',
      // 'url(images/yellow-candy.png)',
      // 'url(images/orange-candy.png)',
      // 'url(images/purple-candy.png)',
      // 'url(images/green-candy.png)',
      // 'url(images/blue-candy.png)'
      'red',
      'yellow',
      'orange',
      'purple',
      'green',
      'blue'
   ]
   let score = 0
   // create board
   function createBoard(){
      for(let i=0; i<width*width; i++){
         const square = document.createElement('div')
         square.setAttribute('draggable', true)
         square.setAttribute('id', i)
         const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
         square.style.backgroundColor = randomColor;
         grid.appendChild(square);
         squares.push(square)
      }
   }
   createBoard()


   // drag the candies

   let colorBeingDragged
   let colorBeingReplaced
   let squareIdBeingDragged
   let squareIdBeingReplaced

   squares.forEach(square => square.addEventListener('dragstart', dragStart))
   squares.forEach(square => square.addEventListener('dragend', dragEnd))
   squares.forEach(square => square.addEventListener('dragover', dragOver))
   squares.forEach(square => square.addEventListener('dragenter', dragEnter))
   squares.forEach(square => square.addEventListener('dragleave', dragLeave))
   squares.forEach(square => square.addEventListener('drop', dragDrop))


   function dragStart(){
      colorBeingDragged = this.style.backgroundColor
      squareIdBeingDragged = parseInt(this.id)
      console.log(colorBeingDragged)
      console.log(this.id, 'dragstart')
   }
   
   function dragOver(e){
      e.preventDefault()
      console.log(this.id, 'dragover')
   }
   
   function dragEnter(e){
      e.preventDefault()
      console.log(this.id, 'dragenter')
   }
   
   function dragLeave(){
      console.log(this.id, 'dragleave')
   }
   
   function dragDrop(){
      console.log(this.id, 'dragdrop')
      colorBeingReplaced = this.style.backgroundColor
      squareIdBeingReplaced = parseInt(this.id)
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged
   }
   
   // let validMoveMatch = () => {
   //    // vertical
   //    if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+width].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+width+width].style.backgroundColor)){ return true }
   //    else if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-width].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+width].style.backgroundColor)) { return true }
   //    else if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-width].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-width-width].style.backgroundColor)) { return true }
   //    // horizontal
   //    else if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+1].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+2].style.backgroundColor)) { return true }
   //    else if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-1].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced+1].style.backgroundColor)) { return true }
   //    else if((squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-1].style.backgroundColor) && (squares[squareIdBeingDragged].style.backgroundColor === squares[squareIdBeingReplaced-2].style.backgroundColor)) { return true }
   //    // else
   //    return false
   // }

   function dragEnd(){
      console.log(this.id, 'dragend')
      // valid moves
      let validMoves = [
         squareIdBeingDragged - 1,
         squareIdBeingDragged - width,
         squareIdBeingDragged + 1,
         squareIdBeingDragged + width
      ]

      let validMove = validMoves.includes(squareIdBeingReplaced)

      if(squareIdBeingReplaced && validMove){
         squareIdBeingReplaced = null
      }else if(squareIdBeingReplaced && !validMove){
         squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
         squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
      }
      else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
   }






   // drop candies if path is cleared
   function moveDown(){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      for(let i=0; i<=55; i++){
         const isFirstRow = firstRow.includes(i)
         if(isFirstRow && squares[i].style.backgroundColor === ''){
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            squares[i].style.backgroundColor = randomColor
            continue
         }
         if(squares[i + width].style.backgroundColor === ''){
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
            squares[i].style.backgroundColor = ''
         }
      }
   }








   // checking for matches (3)
   // check for row of three
   function checkRowForThree(){
      for(let i=0; i<62; i++){
         let rowOfThree = [i, i+1, i+2]
         let decidedColor = squares[i].style.backgroundColor
         const isBlank = squares[i].style.backgroundColor === ''

         const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
         if(notValid.includes(i)) continue

         if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => squares[index].style.backgroundColor = '')
         }
      }
   }

   // check for column of three
   function checkColumnForThree(){
      for(let i=0; i<48; i++){
         let columnOfThree = [i, i+width, i+width*2]
         let decidedColor = squares[i].style.backgroundColor
         const isBlank = squares[i].style.backgroundColor === ''

         if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => squares[index].style.backgroundColor = '')
         }
      }
   }







   // checking for matches (4)
   // check for row of four
   function checkRowForFour(){
      for(let i=0; i<61; i++){
         let rowOfFour = [i, i+1, i+2, i+3]
         let decidedColor = squares[i].style.backgroundColor
         const isBlank = squares[i].style.backgroundColor === ''

         const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
         if(notValid.includes(i)) continue

         if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => squares[index].style.backgroundColor = '')
         }
      }
   }

   // check for column of four
   function checkColumnForFour(){
      for(let i=0; i<40; i++){
         let columnOfFour = [i, i+width, i+width*2, i+width*3]
         let decidedColor = squares[i].style.backgroundColor
         const isBlank = squares[i].style.backgroundColor === ''

         if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => squares[index].style.backgroundColor = '')
         }
      }
   }





   window.setInterval(function(){
      moveDown()
      checkRowForFour()
      checkColumnForFour()
      checkRowForThree()
      checkColumnForThree()
   }, 100)


})


