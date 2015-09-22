function clearPageBreaks(){
	$("pb").css("display","none");
	$(".-teibp-pb").css("display","none");
}

function addPageBreaks(){
	$("pb").css("display","block");
	$(".-teibp-pb").css("display","block");
}

function init(){
	if (document.getElementById('pbToggle') !== null) {
		document.getElementById('pbToggle').onclick = function(){
			if(document.getElementById('pbToggle').checked){
				clearPageBreaks();
			}else{
				addPageBreaks();
			}
		};
		addPageBreaks();
		document.getElementById('pbToggle').checked = false;
	}
}

//If W3C event model used, prefer that. Window events are fallbacks
if(document.addEventListener){
	//W3C event model used
	document.addEventListener("DOMContentLoaded", init, false);
	window.addEventListener("load", init, false);
} else if(document.attachEvent){
	//IE event model used
	document.attachEvent( "onreadystatechange", init);
	window.attachEvent( "onload", init);
}

function switchThemes(theme) {
	document.getElementById('maincss').href=theme.options[theme.selectedIndex].value;
}

function showFacs(num, url, id, filePrefix) {
	facsWindow = window.open("about:blank");
	facsWindow.document.write("<html>");
	facsWindow.document.write("<head>");
	facsWindow.document.write("<title>TEI Boilerplate Facsimile Viewer</title>");
	facsWindow.document.write($('#maincss')[0].outerHTML);
	facsWindow.document.write($('#customcss')[0].outerHTML);
	facsWindow.document.write("<link rel='stylesheet' href='" + filePrefix + "/css/jquery-ui.min.css'>");

	facsWindow.document.write("<script type='text/javascript' src='" + filePrefix + "/js/jquery.min.js'></script>");
	facsWindow.document.write("<script type='text/javascript' src='" + filePrefix + "/js/jquery-ui.min.js'></script>");
	//facsWindow.document.write("<script type='text/javascript' src='" + filePrefix + "/js/jquery.blockUI.js'></script>");
	facsWindow.document.write("<script type='text/javascript' src='" + filePrefix + "/js/jquery.scrollTo.min.js'></script>");
	facsWindow.document.write("<script type='text/javascript' src='" + filePrefix + "/js/teibp.js'></script>");
	facsWindow.document.write("<script type='text/javascript'>");
	facsWindow.document.write("$(document).ready(function() {");
	facsWindow.document.write("$('.facsImage').scrollTo($('#" + id + "'))");
	facsWindow.document.write("})");
	facsWindow.document.write("</script>");
	facsWindow.document.write("<script type='text/javascript'>	$(function() {$( '#resizable' ).resizable();});</script>");
	facsWindow.document.write("</head>");
	facsWindow.document.write("<body>");
	facsWindow.document.write($("teiHeader")[0].outerHTML);

	facsWindow.document.write("<div id='resizable'>");
	facsWindow.document.write("<div class='facsImage'>");
	$(".-teibp-thumbnail").each(function() {
		facsWindow.document.write("<img id='" + $(this).parent().parent().parent().attr('id') + "' src='" + $(this).attr('src') + "' alt='facsimile page image'/>");
	});
	facsWindow.document.write("</div>");
	facsWindow.document.write("</div>");
	facsWindow.document.write($("footer")[0].outerHTML);

	facsWindow.document.write("</body>");
	facsWindow.document.write("</html>");
	facsWindow.document.close();
}