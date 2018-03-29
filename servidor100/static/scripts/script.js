var last;

function flipCircle() {
	$("#circle").addClass("flipWatson");
	setTimeout(() => {
		$("#linkSite").css({ "opacity": "0" });
		setTimeout(() => {
			$("#circle").animate(
				{
					"width": "90vw",
					"height": "100vh",
					"border-radius": "3vw",
					"margin-bottom": "3vw"
				},
				1000,
				() => {
					$("body").css({ "perspective": "1500px" });
					$("#circle").removeClass("flipWatson");
					$("#linkSite").fadeTo(750, 1);
				}
			);
		}, 1550);
	}, 500);
}

function flipRectangle() {
	$("#circle").addClass("flipWatson");
	setTimeout(() => {
		$("#linkSite").css({ "opacity": "0" });
		setTimeout(() => {
			$("#circle").removeClass("flipWatson");
			$("#linkSite").fadeTo(750, 1);
		}, 1550);
	}, 500);
}

$(document).ready(function () {

	setInterval(function () {
		$.post("/url", function (data) {
			if (data != ($("#linkSite").attr("src"))) {
				last = $("#linkSite").attr("src");
				$("#linkSite").attr("src", data);
				if (last == "/init") {
					flipCircle();
				}
				else {
					flipRectangle();
				}
			}
		});
	}, 1500);

});
