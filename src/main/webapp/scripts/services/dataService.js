"use strict";

sebiblog.factory( "dataService", function() {
    return {
        commentPipe: AeroGear.Pipeline({
            name: "comments"
         }).pipes.comments,

        commentStore: AeroGear.DataManager({
            name: "Comment",
            type: "SessionLocal",
            settings: {
                 storageType: "localStorage"
            }
        }).stores.Comment,
        postPipe: AeroGear.Pipeline({
            name: "posts"
         }).pipes.posts,

        postStore: AeroGear.DataManager({
            name: "Post",
            type: "SessionLocal",
            settings: {
                 storageType: "localStorage"
            }
        }).stores.Post,

        restAuth: AeroGear.Auth({
            name: "auth",
            settings: {
                agAuth: true,
                endpoints: {
                    enroll: "auth/enroll"
                }
            }
        }).modules.auth


    };
});