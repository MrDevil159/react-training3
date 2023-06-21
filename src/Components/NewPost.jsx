import React from 'react';

const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody, editingPost, VerifyTokenUser
}) => {
    VerifyTokenUser();
    return (


        <div class="container">
	<div class="row">
	    
	    <div class="col-md-12 col-md-offset-2">
	        <div className='panel panel-info'>
                <div className="panel-heading">
                    <h4 className='ms-2 p-2'>{editingPost ? 'Edit Post' : 'Create Post'}</h4>
                </div>
                <div className="panel-body">
                <form className='p-3' onSubmit={handleSubmit}>
    		    
    		    <div class="form-group">
    		        <label for="title">Title <span class="require">*</span></label>
    		        <input id="postTitle"
                    type="text"
                    class="form-control"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)} />
    		    </div>
    		    
    		    <div class="form-group">
    		        <label for="description">Description <span class="require">*</span></label>
    		        <textarea rows="5" id="postBody"
                    class="form-control"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)} />
    		    </div>
    		    
    		    <div class="form-group">
    		        <p><span class="require">*</span> - required fields</p>
    		    </div>
    		    
    		    <div class="form-group">
    		        <button type="submit" class="btn btn-primary">
                    {editingPost ? 'Save Changes' : 'Create Post'}
    		        </button>

    		    </div>
    		    
    		</form>
                </div>
            </div>
    		
		</div>
		
	</div>
</div>
        
    )
}

export default NewPost
