Personal site for blogging and keeping track of all reading.

Helpful ZSH commands for autocreating posts

```bash
function share() {
  if [ "$1" != "" ]
  then
    hugo new shared/$(date +%Y)/$1
  else 
    echo "You have to pass in an argument, nerd."
  fi
}

function book() {
  if [ "$1" != "" ]
  then
    hugo new --kind read read/$(date +%Y)/$1
  else 
    echo "You have to pass in an argument, nerd."
  fi
}

function post() {
  if ["$1" != ""]
  then
    hugo new wrote/$(date +%Y)/$1
  else
    echo "You have to pass in an argument, nerd."
  fi
}
```