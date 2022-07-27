import graphene
from graphene_django import DjangoObjectType
from mainapp.models import User
from todoapp.models import TODO, Project


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_notices = graphene.List(TODOType)
    project_by_name = graphene.Field(ProjectType, name=graphene.String(required=True))
    notices_by_project_name = graphene.List(TODOType, name=graphene.String(required=False))

    def resolve_all_notices(root, info):
        return TODO.objects.all()

    def resolve_project_by_name(self, info, name):
        try:
            return Project.objects.get(project_name=name)
        except Project.DoesNotExist:
            return None

    def resolve_notices_by_project_name(self, info, name=None):
        notices = TODO.objects.all()
        if name:
            notices = notices.filter(project__project_name=name)
        return notices


class TODOMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    notice = graphene.Field(TODOType)

    @classmethod
    def mutate(cls, root, info, text, id):
        notice = TODO.objects.get(pk=id)
        notice.text = text
        notice.save()
        return TODOMutation(notice=notice)


class Mutation(graphene.ObjectType):
    update_notice = TODOMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

# Examples of requests
####################################################
# {
# 	projectByName(name: "library"){
#     users{
#       firstName
#       lastName
#     }
#   }
# }
####################################################
# mutation
# updateNotice
# {
#     updateNotice(text: "Done", id: 2){
#     notice
# {
#     id
# text
# }
#
# }
# }
