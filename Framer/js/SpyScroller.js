var SpyScroller = (function(){
	function SpyScroller(){
		this._collection=[];
		this._currentItem=null;
		this.init();
	}
	SpyScroller.prototype=
	{
		EVENTS:
		{
			CHANGE:'SPYSCROLLER_CHANGE'
		},
		init:function(){
		//document.addEventListener('DOMContentLoaded',)
		window.addEventListener('scroll',this.onResize.bind(this));
	},
	addItems:function(array){
		this._collection = array;
	},
	onResize:function(){
		if(!this._collection)return;
		var previousItem = this._currentItem;
		for(var a=0;a<this._collection.length;a++){
			var item = this._collection[a];
			if(item.offsetTop<=document.body.scrollTop)
			{
				this._currentItem = item;
			}
		}
		if(previousItem!=this._currentItem)
		{
			var event = new CustomEvent(this.EVENTS.CHANGE, {"detail":{"item":this._currentItem}});
			document.dispatchEvent(event);
		}
	}
}
return new SpyScroller();
})();

//polyfill CustomEvent
(function () {
	if( window.CustomEvent)return;
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();