import { Query, Resolver, InputType, Field, Mutation, Arg, ID, FieldResolver, Root } from "type-graphql";
import Post from "../entity/Post";

@InputType()
class AddPostInput {
  @Field()
  body!: string;

  @Field(type => ID, { nullable: true })
  parentId!: string | null;
}

@Resolver(Post)
export default class PostResolver {
  @Query(() => [Post])
  async allPosts() {
    return Post.find();
  }

  @Query(() => [Post])
  async rootPosts() {
    return Post.find({
      where: {
        parentId: null
      }
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id", type => ID) id: string) {
    const post = await Post.findOne(Number(id));
    return post;
  }

  @Mutation(() => Post)
  async addPost(@Arg("input") input: AddPostInput): Promise<Post> {
    const post = new Post();
    post.body = input.body;
    if (input.parentId) {
      const parent = await Post.findOneOrFail(Number(input.parentId));
      post.parent = parent;
    }
    return post.save();
  }

  @FieldResolver(type => [Post])
  async flatChildren(@Root() post: Post, @Arg("nestingLevel") nestingLevel: number) {
    async function getChildren(currentPost: Post, remainingLevels: number): Promise<Post[]> {
      if (remainingLevels === 0) {
        return [];
      }
      const children = await Post.find({
        where: {
          parent: currentPost
        }
      });
      const descendants = (await Promise.all(children.map(child => getChildren(child, remainingLevels - 1)))).flat();
      return children.concat(descendants);
    }
    return getChildren(post, nestingLevel);
  }

  @FieldResolver(type => ID, { nullable: true })
  parentId(@Root() post: Post) {
    return post.parentId;
  }
}
