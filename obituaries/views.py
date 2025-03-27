from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView
from django.urls import reverse_lazy
from django.contrib import messages
from django.db.models import Q
from .models import Obituary

# Create your views here.

class ObituaryListView(ListView):
    model = Obituary
    paginate_by = 10
    context_object_name = 'obituaries'
    template_name = 'obituaries/obituary_list.html'

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.GET.get('q')
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(content__icontains=query) |
                Q(author__icontains=query)
            )
        return queryset

class ObituaryDetailView(DetailView):
    model = Obituary
    context_object_name = 'obituary'
    template_name = 'obituaries/obituary_detail.html'

class ObituaryCreateView(CreateView):
    model = Obituary
    template_name = 'obituaries/obituary_form.html'
    fields = ['name', 'date_of_birth', 'date_of_death', 'content', 'author']
    success_url = reverse_lazy('obituary_list')

    def form_valid(self, form):
        messages.success(self.request, 'Obituary submitted successfully.')
        return super().form_valid(form)
