const currentLocation = location.href
const item = document.querySelectorAll('a')
const menulength = item.length
for (let i=0; i < menulength; i++)
if(item[i].href === currentLocation){
    item[i].className="active"
}