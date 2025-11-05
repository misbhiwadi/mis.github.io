var otpval="";

function validateMyForm()
{
    console.log("Came here");
    var em = document.getElementById("contact_email").value;
    var ph = document.getElementById("contact_phone").value;
    var nm = document.getElementById("contact_name").value;
     var params = "name="+nm+"&phno="+ph+"&email="+em+"&flag=true";
         $("#myModal1").modal();
        
        //if subject then use : +"&subject="+slt_prd
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {


        
         var response = JSON.parse(this.responseText);
         
         if(response.type == "error")
         {
            alert("Error! "+response.message);
         }
         else
         {
            otpval = response.message;
         }
        }
      };
      xhttp.open("GET", "sotp.html?"+params, true);
      xhttp.send();
    return false;
}

    function checkOTP() {
        
        var otpnum = document.getElementById("optnumber").value;
        
        if(otpnum != otpval)
        {
            document.getElementById("msglabel").innerHTML = "Invalid OTP Value";
            //alert("Nada");
        }
        else
        {
            document.getElementById("msglabel").innerHTML = "Verifying..";
            $("#myModal1").modal('hide');
            //alert("Submitted");
            
            submitInquiry();
            //window.location.reload;
        }
        return false;
    }


    function submitInquiry()
    {
         console.log("Came here");
        var em = document.getElementById("contact_email").value;
        var ph = document.getElementById("contact_phone").value;
        var nm = document.getElementById("contact_name").value;
        var d = new Date();
        var dt = d.toDateString();

        var e = document.getElementById("options");
        var strUser = e.options[e.selectedIndex].text;

        var opt1 = strUser;
        console.log("OPTS: " +  opt1);
        
        var f = document.getElementById("options1");
        var strUser1 = f.options[f.selectedIndex].text;

        var opt2 = strUser1;
        console.log("OPTS: " +  opt2);
        




         var params = "name="+btoa(nm)+"&phno="+btoa(ph)+"&email="+btoa(em)+"&dt="+btoa(dt)+"&opt1="+btoa(opt1)+"&opt2="+btoa(opt2)+"&flag="+btoa("true");
            //if subject then use : +"&subject="+slt_prd
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var response = JSON.parse(this.responseText);
         //alert(this.responseText);
         
             if(response.type == "error")
             {
                alert("Error! "+response.message);
             }
             else
             {
              alert(response.message);
              location.href='index.html';
             }
            }
          };
          xhttp.open("GET", "smail.html?"+params, true);
          xhttp.send();
    }