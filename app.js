let currentLetter = 0;
let currentGame = 1;
let scoreCount = 0;


const nextWords = document.querySelector(".next");


const getRandomIntInclusive =(min, max) =>{
    //gets a random number bewteen two numbers
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  
const scrambleWords = (sentance) =>{

    const words = sentance.split(' ')

    for (let i = 0; i < words.length; i++) {
        
       if(words[i].length > 3){
        //make sure that word will be scramle 
        if(words[i].length == 4){
            let empty = '';
            let chars = words[i].split('')
            empty = chars[1];
            chars[1]= chars[2];
            chars[2] = empty;
            words[i] = chars.join('')

        }
        //else it will scramble the word like normal

           for (let j = 1; j < words[i].length -1; j++) {

               let random_num = getRandomIntInclusive(1,words[i].length -2 )
               let temp = '';
               let chars = words[i].split('')

            temp = chars[j];
            chars[j] = chars[random_num];
            chars[random_num] = temp;
            words[i] = chars.join('')
          
               
           }

       }
    }
    return sentance = words.join(' ')
}

const nextGame = () =>{

    
    const nextUrl ='https://api.hatchways.io/assessment/sentences/'+ currentGame
    let span = document.querySelector('.display')
    let guessContainer = document.querySelector('.quess_container')
    let score = document.querySelector('.score')
    let container = document.querySelector('.container')


    guessContainer.innerHTML =""
    span.innerHTML = ""

    currentLetter =0


    scoreCount++;
    score.innerHTML = ''
    score.innerHTML = "Score: "+ scoreCount

    if(scoreCount == 10){
        container.innerHTML =''
        container.innerHTML = "You Win!"
    }


    getFetch(nextUrl)
}

const getFetch = (url) =>{
    fetch(url)
    .then(function(res){
    
        //handle response
        return  res.json(); 
    })
    .then((res) =>{
        let words= res.data.sentence; 
        words = words.toLowerCase()
        let scrabmled  =scrambleWords(words)
        let letters= words.split(/(?=[])|(?<=[ ])/g)
        console.log(letters)
  

        let span = document.querySelector('.display')
        let guessContainer = document.querySelector('.quess_container')
        let li = document.createElement('li')


        li.innerHTML = scrabmled
        span.appendChild(li)
       
        for (let i = 0; i < letters.length; i++) {
           let letterContainer = document.createElement('div')
           letterContainer.classList.add('letterContainer')
           for (let j = 0; j < letters[i].length; j++) {
               let letter = document.createElement('button');
               letter.classList.add('letter')
                

               if(letters[i][j] == " "){
                   letter.classList.add("space")
               }
               letter.innerHTML = letters[i][j];
               letterContainer.appendChild(letter)
              
               
           }
           guessContainer.appendChild(letterContainer)
        }
      

        let allLetter = document.querySelectorAll('.letter')
        for (let i = 0; i < allLetter.length; i++) {
            
            allLetter[i].setAttribute('data-letter' , allLetter[i].innerHTML)
            allLetter[i].innerHTML = ""
            
            
        }
    


    })
    .catch(function(){

    })

}




const makeGuess = (e) =>{
    let guess= document.querySelectorAll('.letter');
    let next = document.querySelector('.next')
  

    if(e.keyCode == 8){
        currentLetter--;
        guess[currentLetter].innerHTML = " "
        guess[currentLetter].classList.remove('correct')
        return true
    }
 

    else  if(guess[currentLetter].dataset.letter  === e.key){
         guess[currentLetter].classList.remove('space')
            guess[currentLetter].classList.add('correct')
        }

    
        guess[currentLetter].innerHTML = e.key
        currentLetter++;
        return true
    }
const checkWinner =()=>{
    let check = document.querySelectorAll('.letter')
    let nextWords = document.querySelector(".next");

    console.log(currentLetter)
    if(check.length === currentLetter){
       nextWords.classList.remove('noDisplay')
    }
}

//intital get fetch futher get request will be fetch by getFetch

fetch('https://api.hatchways.io/assessment/sentences/1')
    .then(function(res){
    
        //handle response
        return  res.json(); 
    })
    .then((res) =>{
        let words= res.data.sentence; 
        words = words.toLowerCase()
        let scrabmled  =scrambleWords(words)
        let letters= words.split(/(?=[])|(?<=[ ])/g)
        console.log(letters)
  

        let span = document.querySelector('.display')
        let guessContainer = document.querySelector('.quess_container')
        let li = document.createElement('li')


        li.innerHTML = scrabmled
        span.appendChild(li)
       
        for (let i = 0; i < letters.length; i++) {
           let letterContainer = document.createElement('div')
           letterContainer.classList.add('letterContainer')
           for (let j = 0; j < letters[i].length; j++) {
               let letter = document.createElement('button');
               letter.classList.add('letter')
                

               if(letters[i][j] == " "){
                   letter.classList.add("space")
               }
               letter.innerHTML = letters[i][j];
               letterContainer.appendChild(letter)
              
               
           }
           guessContainer.appendChild(letterContainer)
        }
      

        let allLetter = document.querySelectorAll('.letter')

        for (let i = 0; i < allLetter.length; i++) {
            
            allLetter[i].setAttribute('data-letter' , allLetter[i].innerHTML)
            allLetter[i].innerHTML = ""
           
            
        }
    


    })
    .catch(function(){

    })

    document.addEventListener('keydown', (e)=>{
        makeGuess(e)
        checkWinner()
    })



nextWords.addEventListener('click', ()=>{
    nextWords.classList.add('noDisplay')
    currentGame++;
    nextGame()
})